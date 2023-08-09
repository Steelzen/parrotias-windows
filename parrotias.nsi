!include "MUI2.nsh"

; Set the default installation directory
InstallDir "$PROGRAMFILES\Parrotias"

; Define the license data
LicenseData "License Agreement
==================

MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

"

; Define the MUI settings
!define MUI_PAGE_CUSTOMFUNCTION_SHOW ShowCustomPage
!define MUI_PAGE_CUSTOMFUNCTION_LEAVE LeaveCustomPage

; Custom page function to display the downloader UI
Function ShowCustomPage
  nsDialogs::Create 1018
  nsDialogs::Show
FunctionEnd

; Custom page function to handle leaving the downloader UI
Function LeaveCustomPage
  ; Perform any necessary cleanup or validation
FunctionEnd

; Define the MUI pages
!insertmacro MUI_PAGE_WELCOME
!insertmacro MUI_PAGE_LICENSE
!insertmacro MUI_PAGE_DIRECTORY
!insertmacro MUI_PAGE_INSTFILES

; Customize the downloader page
!define MUI_PAGE_CUSTOMFUNCTION_PRE DownloadPagePre
!define MUI_PAGE_CUSTOMFUNCTION_SHOW DownloadPageShow
!define MUI_PAGE_CUSTOMFUNCTION_LEAVE DownloadPageLeave

; Custom function to prepare the downloader page
Function DownloadPagePre
  nsDialogs::Create 1018
  nsDialogs::CreateControl LABEL ${WS_VISIBLE}|${SS_CENTERIMAGE} 0 0 100% 100% "Downloading..."
  Pop $0
FunctionEnd

; Custom function to show the downloader page
Function DownloadPageShow
  nsDialogs::Show
FunctionEnd

; Custom function to handle leaving the downloader page
Function DownloadPageLeave
  ; Perform any necessary cleanup or validation
FunctionEnd

; Set the installer attributes
!insertmacro MUI_FUNCTION_DESCRIPTION_BEGIN
  !insertmacro MUI_DESCRIPTION_TEXT ${MUI_PAGE_LICENSE} "License Agreement"
  !insertmacro MUI_DESCRIPTION_TEXT ${MUI_PAGE_DIRECTORY} "Choose the installation directory"
  !insertmacro MUI_DESCRIPTION_TEXT ${MUI_PAGE_INSTFILES} "Ready to install"
!insertmacro MUI_FUNCTION_DESCRIPTION_END

Section
; Add your installation logic here
SectionEnd
