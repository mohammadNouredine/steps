const phoneUtil =
  require("google-libphonenumber").PhoneNumberUtil.getInstance();

export default function validatePhoneNb(phoneNumber: string) {
  if (!phoneNumber) return false;

  const number = phoneUtil.parse(phoneNumber);

  if (phoneUtil.isValidNumber(number)) {
    // const countryCode = number.getCountryCode();
    // const countryName = phoneUtil.getRegionCodeForNumber(number);
    return true;
  } else {
    return false;
  }
}
