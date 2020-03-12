// Copyright (c) 2013 The Chromium Embedded Framework Authors. All rights
// reserved. Use of this source code is governed by a BSD-style license that
// can be found in the LICENSE file.

#include "fchost_handler.h"

#include <sstream>
#include <string>
#include <fstream>

#include "include/base/cef_bind.h"
#include "include/cef_app.h"
#include "include/views/cef_browser_view.h"
#include "include/views/cef_window.h"
#include "include/wrapper/cef_closure_task.h"
#include "include/wrapper/cef_helpers.h"

namespace {

FCHostHandler* g_instance = NULL;

}  // namespace

FCHostHandler::FCHostHandler(bool use_views)
    : use_views_(use_views), is_closing_(false) {
  DCHECK(!g_instance);
  g_instance = this;
}

FCHostHandler::~FCHostHandler() {
  g_instance = NULL;
}

// static
FCHostHandler* FCHostHandler::GetInstance() {
  return g_instance;
}

void FCHostHandler::OnTitleChange(CefRefPtr<CefBrowser> browser,
                                  const CefString& title) {
  CEF_REQUIRE_UI_THREAD();

  if (use_views_) {
    // Set the title of the window using the Views framework.
    CefRefPtr<CefBrowserView> browser_view =
        CefBrowserView::GetForBrowser(browser);
    if (browser_view) {
      CefRefPtr<CefWindow> window = browser_view->GetWindow();
      if (window)
        window->SetTitle(title);
    }
  } else {
    // Set the title of the window using platform APIs.
    PlatformTitleChange(browser, title);
  }
}

static std::string DateTime()
{
	time_t rawtime;
	struct tm* timeInfo;
	char buffer[80];

	time(&rawtime);
	timeInfo = localtime(&rawtime);

	strftime(buffer, 80, "%Y-%m-%d %I:%M:%S", timeInfo);

	return std::string(buffer);
}

bool FCHostHandler::OnConsoleMessage(CefRefPtr<CefBrowser> browser, cef_log_severity_t level,
									 const CefString& message, const CefString& source, int line)
{
	std::ofstream s("console.log", std::ios_base::app);
	s << DateTime() << " - ";
    if (!source.empty()) {
        s << source.c_str();
    } else {
        s << "Unknown Source";
    }
    s << ":" << line << ": " << message.c_str() << "\n";

	return false;
}

void FCHostHandler::OnAfterCreated(CefRefPtr<CefBrowser> browser) {
  CEF_REQUIRE_UI_THREAD();

  // Add to the list of existing browsers.
  browser_list_.push_back(browser);
}

bool FCHostHandler::DoClose(CefRefPtr<CefBrowser> browser) {
  CEF_REQUIRE_UI_THREAD();

  // Closing the main window requires special handling. See the DoClose()
  // documentation in the CEF header for a detailed destription of this
  // process.
  if (browser_list_.size() == 1) {
    // Set a flag to indicate that the window close should be allowed.
    is_closing_ = true;
  }

  // Allow the close. For windowed browsers this will result in the OS close
  // event being sent.
  return false;
}

void FCHostHandler::OnBeforeClose(CefRefPtr<CefBrowser> browser) {
  CEF_REQUIRE_UI_THREAD();

  // Remove from the list of existing browsers.
  BrowserList::iterator bit = browser_list_.begin();
  for (; bit != browser_list_.end(); ++bit) {
    if ((*bit)->IsSame(browser)) {
      browser_list_.erase(bit);
      break;
    }
  }

  if (browser_list_.empty()) {
    // All browser windows have closed. Quit the application message loop.
    CefQuitMessageLoop();
  }
}

void FCHostHandler::OnLoadError(CefRefPtr<CefBrowser> browser,
                                CefRefPtr<CefFrame> frame,
                                ErrorCode errorCode,
                                const CefString& errorText,
                                const CefString& failedUrl) {
  CEF_REQUIRE_UI_THREAD();

  // Don't display an error for downloaded files.
  if (errorCode == ERR_ABORTED)
    return;

  // Display a load error message.
  std::stringstream ss;
  ss << "<html><body bgcolor=\"white\">"
        "<h2>Failed to load URL "
     << std::string(failedUrl) << " with error " << std::string(errorText)
     << " (" << errorCode << ").</h2></body></html>";
  frame->LoadString(ss.str(), failedUrl);
}

void FCHostHandler::OnBeforeDownload(CefRefPtr<CefBrowser> browser,
									 CefRefPtr<CefDownloadItem> download_item,
									 const CefString& suggested_name,
									 CefRefPtr< CefBeforeDownloadCallback > callback)
{
	CEF_REQUIRE_UI_THREAD();

	callback->Continue(suggested_name, true);
}

bool FCHostHandler::OnPreKeyEvent(CefRefPtr<CefBrowser> browser,
	const CefKeyEvent& event,
	CefEventHandle os_event,
	bool* is_keyboard_shortcut)
{
	CEF_REQUIRE_UI_THREAD();

	if (event.type == cef_key_event_type_t::KEYEVENT_CHAR)
	{
		// CTRL+SHIFT+J - bring up the Javascript debugger
		if ((event.modifiers == (cef_event_flags_t::EVENTFLAG_CONTROL_DOWN | cef_event_flags_t::EVENTFLAG_SHIFT_DOWN)) && event.unmodified_character == 10 /* j? maybe only on windows? whatever */)
		{
			CefWindowInfo windowInfo;
			CefBrowserSettings settings;
			CefPoint point;
			windowInfo.SetAsPopup(browser->GetHost()->GetWindowHandle(), "DevTools");
			browser->GetHost()->ShowDevTools(windowInfo, browser->GetHost()->GetClient(), settings, point);

			return true;
		}
		// CTRL+F - bring up Find In Page
		else if (event.modifiers == cef_event_flags_t::EVENTFLAG_CONTROL_DOWN && event.unmodified_character == 6 /* f? maybe only on windows? whatever */)
		{
			// probably can do this at some point by ripping off code from the full-fat cefclient, but damn there's a lot of it...
			// return true;
		}
	}

	return false;
}


void FCHostHandler::CloseAllBrowsers(bool force_close) {
  if (!CefCurrentlyOn(TID_UI)) {
    // Execute on the UI thread.
    CefPostTask(TID_UI, base::Bind(&FCHostHandler::CloseAllBrowsers, this,
                                   force_close));
    return;
  }

  if (browser_list_.empty())
    return;

  BrowserList::const_iterator it = browser_list_.begin();
  for (; it != browser_list_.end(); ++it)
    (*it)->GetHost()->CloseBrowser(force_close);
}
