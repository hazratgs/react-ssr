export default function getMobileOS () {
  const iOS = 'https://itunes.apple.com/US/app/id1360632912&hl=en_US'
  const Android = 'https://play.google.com/store/apps/details?id=com.crypterium&hl=en_US'

  if (typeof window === 'undefined') return iOS

  var userAgent = navigator.userAgent || navigator.vendor || window.opera

  // Windows Phone must come first because its UA also contains "Android"
  if (/windows phone/i.test(userAgent)) {
    return 'winphone'
  }

  if (/android/i.test(userAgent)) {
    return Android
  }

  // iOS detection from: http://stackoverflow.com/a/9039885/177710
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return iOS
  }

  return iOS
}

export function getMobileOSName () {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera

  // Windows Phone must come first because its UA also contains "Android"
  if (/windows phone/i.test(userAgent)) {
    return 'winphone'
  }

  if (/android/i.test(userAgent)) {
    return 'android'
  }

  // iOS detection from: http://stackoverflow.com/a/9039885/177710
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return 'ios'
  }

  return 'none'
}
