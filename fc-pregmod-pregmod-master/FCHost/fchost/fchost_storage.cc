#include "fchost_storage.h"

#include <algorithm>
#if defined(OS_WIN)
#include "shlwapi.h"
#endif

CefRefPtr<CefV8Value> FCHostSessionStorage::keys() const
{
	// holy hell this is awful.  I hope Sugarcube doesn't actually USE this...
	CefRefPtr<CefV8Value> ret = CefV8Value::CreateArray(static_cast<int>(storage.size()));
	auto itr = storage.cbegin();
	for (int i = 0; i < static_cast<int>(storage.size()); ++i, ++itr)
	{
		ret->SetValue(i, CefV8Value::CreateString(itr->first));
	}
	return ret;
}

#if defined(OS_WIN)
/* This should't happen, so don't waste time on it.  Sugarcube really only writes simple alphanumeric keys.
static bool SanitizePath(std::wstring& inpath)
{
	std::transform(inpath.begin(), inpath.end(), inpath.begin(), [](wchar_t c)
	{
		if (PathGetCharTypeW(c) != GCT_LFNCHAR)
			return L'_';
		else
			return c;
	});
}
*/

void FCHostPersistentStorage::set(const CefString& key, CefRefPtr<CefV8Value> val)
{
	__super::set(key, val);

	// only strings get persisted (should be ok, Sugarcube will serialize first)
	if (val->IsString())
	{
		// we should probably be doing this async but TBT Sugarcube is the slow part, not the file IO
		DWORD written;
		HANDLE fh = CreateFile(get_filename(key).c_str(), GENERIC_WRITE, 0, NULL, CREATE_ALWAYS, FILE_ATTRIBUTE_NORMAL, NULL);
		CefString valStr = val->GetStringValue();
		if (valStr.size() > 0)
		{
			WriteFile(fh, valStr.c_str(), static_cast<DWORD>(valStr.size() * sizeof(valStr.c_str()[0])), &written, NULL);
		}
		CloseHandle(fh);
	}
}

bool FCHostPersistentStorage::remove(const CefString& key)
{
	bool retval = __super::remove(key);

	DeleteFile(get_filename(key).c_str());

	return retval;
}

void FCHostPersistentStorage::clear()
{
	__super::clear();

	WIN32_FIND_DATAW w32fd;
	HANDLE hFind = FindFirstFile((path + L"\\*").c_str(), &w32fd);
	if (hFind != INVALID_HANDLE_VALUE)
	{
		do
		{
			if (w32fd.dwFileAttributes & ~(FILE_ATTRIBUTE_DIRECTORY | FILE_ATTRIBUTE_DEVICE))
			{
				DeleteFile(get_filename(w32fd.cFileName).c_str());
			}
		} while (FindNextFile(hFind, &w32fd));
		FindClose(hFind);
	}
}

void FCHostPersistentStorage::load()
{
	constexpr size_t bufsize = 1024 * 1024 * 1024; // 1gb should be enough
	char* readbuf = new char[bufsize];
	WIN32_FIND_DATAW w32fd;
	HANDLE hFind = FindFirstFile((path + L"\\*").c_str(), &w32fd);
	if (hFind != INVALID_HANDLE_VALUE)
	{
		do
		{
			if (w32fd.dwFileAttributes & ~(FILE_ATTRIBUTE_DIRECTORY | FILE_ATTRIBUTE_DEVICE))
			{
				DWORD bytesread = 0;
				HANDLE fh = CreateFile(get_filename(w32fd.cFileName).c_str(), GENERIC_READ, 0, NULL, OPEN_EXISTING, FILE_ATTRIBUTE_NORMAL, NULL);
				if (fh)
				{
					BOOL success = ReadFile(fh, readbuf, static_cast<DWORD>(bufsize - 1), &bytesread, NULL);
					if (success)
					{
						readbuf[bytesread] = L'\0';
						readbuf[bytesread+1] = L'\0'; // null terminate
						CefString val = reinterpret_cast<wchar_t*>(readbuf);
						storage.emplace(w32fd.cFileName, CefV8Value::CreateString(val));
					}
					CloseHandle(fh);
				}
			}
		} while (FindNextFile(hFind, &w32fd));
		FindClose(hFind);
	}
	delete[] readbuf;
}

std::wstring FCHostPersistentStorage::get_filename(const CefString& key) const
{
	return path + L"\\" + key.c_str();
}

void FCHostPersistentStorage::ensure_folder_exists() const
{
	// ignore returned errors
	CreateDirectory(path.c_str(), NULL);
}
#else
#error "Platform-specific persistent storage implementation required."
#endif
