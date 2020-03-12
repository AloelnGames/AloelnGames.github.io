// Copyright (c) 2013 The Chromium Embedded Framework Authors. All rights
// reserved. Use of this source code is governed by a BSD-style license that
// can be found in the LICENSE file.

#pragma once

#include "include/cef_client.h"

#include <list>

class FCHostHandler : public CefClient,
                      public CefDisplayHandler,
                      public CefLifeSpanHandler,
                      public CefLoadHandler,
					  public CefDownloadHandler,
					  public CefKeyboardHandler {
 public:
  explicit FCHostHandler(bool use_views);
  ~FCHostHandler();

  // Provide access to the single global instance of this object.
  static FCHostHandler* GetInstance();

  // CefClient methods:
  virtual CefRefPtr<CefDisplayHandler> GetDisplayHandler() OVERRIDE {
    return this;
  }
  virtual CefRefPtr<CefLifeSpanHandler> GetLifeSpanHandler() OVERRIDE {
    return this;
  }
  virtual CefRefPtr<CefLoadHandler> GetLoadHandler() OVERRIDE { return this; }
  virtual CefRefPtr<CefDownloadHandler> GetDownloadHandler() OVERRIDE { return this; }
  virtual CefRefPtr<CefKeyboardHandler> GetKeyboardHandler() OVERRIDE { return this; }


  // CefDisplayHandler methods:
  virtual void OnTitleChange(CefRefPtr<CefBrowser> browser,
                             const CefString& title) OVERRIDE;
  virtual bool OnConsoleMessage(CefRefPtr<CefBrowser> browser,
							    cef_log_severity_t level,
								const CefString& message,
								const CefString& source,
								int line) OVERRIDE;

  // CefLifeSpanHandler methods:
  virtual void OnAfterCreated(CefRefPtr<CefBrowser> browser) OVERRIDE;
  virtual bool DoClose(CefRefPtr<CefBrowser> browser) OVERRIDE;
  virtual void OnBeforeClose(CefRefPtr<CefBrowser> browser) OVERRIDE;

  // CefLoadHandler methods:
  virtual void OnLoadError(CefRefPtr<CefBrowser> browser,
                           CefRefPtr<CefFrame> frame,
                           ErrorCode errorCode,
                           const CefString& errorText,
                           const CefString& failedUrl) OVERRIDE;

  // CefDownloadHandler methods:
  virtual void OnBeforeDownload(CefRefPtr<CefBrowser> browser,
								CefRefPtr<CefDownloadItem> download_item,
								const CefString& suggested_name,
								CefRefPtr< CefBeforeDownloadCallback > callback) OVERRIDE;

  // CefKeyboardHandler methods:
  virtual bool OnPreKeyEvent(CefRefPtr<CefBrowser> browser,
							const CefKeyEvent& event,
							CefEventHandle os_event,
							bool* is_keyboard_shortcut) OVERRIDE;

  // Request that all existing browser windows close.
  void CloseAllBrowsers(bool force_close);

  bool IsClosing() const { return is_closing_; }

 private:
  // Platform-specific implementation.
  void PlatformTitleChange(CefRefPtr<CefBrowser> browser,
                           const CefString& title);

  // True if the application is using the Views framework.
  const bool use_views_;

  // List of existing browser windows. Only accessed on the CEF UI thread.
  typedef std::list<CefRefPtr<CefBrowser>> BrowserList;
  BrowserList browser_list_;

  bool is_closing_;

  // Include the default reference counting implementation.
  IMPLEMENT_REFCOUNTING(FCHostHandler);
};
