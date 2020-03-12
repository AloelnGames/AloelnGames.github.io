// Copyright (c) 2013 The Chromium Embedded Framework Authors. All rights
// reserved. Use of this source code is governed by a BSD-style license that
// can be found in the LICENSE file.

#include <windows.h>
#include <KnownFolders.h>
#include <ShlObj.h>

#include "fchost_app.h"

CefString FCHostApp::GetLocalStorePath()
{
	PWSTR ppath;
	SHGetKnownFolderPath(FOLDERID_Documents, 0, NULL, &ppath);
	std::wstring local_storage = ppath;
	local_storage += L"\\FreeCities_Pregmod";
	CoTaskMemFree(ppath);
	return local_storage.c_str();
}

// Entry point function for all processes.
int APIENTRY wWinMain(HINSTANCE hInstance,
                      HINSTANCE hPrevInstance,
                      LPTSTR lpCmdLine,
                      int nCmdShow) {
  UNREFERENCED_PARAMETER(hPrevInstance);
  UNREFERENCED_PARAMETER(lpCmdLine);

  // Enable High-DPI support on Windows 7 or newer.
  CefEnableHighDPISupport();

  // Provide CEF with command-line arguments.
  CefMainArgs main_args(hInstance);

  // It will create the first browser instance in OnContextInitialized() after
  // CEF has initialized.
  CefRefPtr<FCHostApp> app(new FCHostApp);

  // CEF applications have multiple sub-processes (render, plugin, GPU, etc)
  // that share the same executable. This function checks the command-line and,
  // if this is a sub-process, executes the appropriate logic.
  int exit_code = CefExecuteProcess(main_args, app.get(), NULL);
  if (exit_code >= 0) {
    // The sub-process has completed so return here.
    return exit_code;
  }

  // Specify CEF global settings here.
  CefSettings settings;

  // Cache location is required for local storage
  CefString local_storage = app->GetLocalStorePath();
  cef_string_from_utf16(local_storage.c_str(), local_storage.length(), &settings.cache_path);

  // Initialize CEF.
  CefInitialize(main_args, settings, app.get(), NULL);

  // Run the CEF message loop. This will block until CefQuitMessageLoop() is
  // called.
  CefRunMessageLoop();

  // Shut down CEF.
  CefShutdown();

  return 0;
}
