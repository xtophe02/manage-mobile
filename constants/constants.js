export const FORGOT_PASSWORD_URL =
  "https://auth.dev.hellomanage.app/auth/forgot-password?";

export const MANAGE_AUTH_URL = "https://auth.dev.hellomanage.app/api/v1/signin";
export const MANAGE_API_URL = "https://api.dev.hellomanage.app";

export function createManageHeaders(token, contentType) {
  return {
    "X-API-KEY":
      "38nbHDiAS8NsdbrljK4T6zE98IQUYL6vCLEtrFgYXrrXJNAmUFy4GqHjWcfFTKexkxTfDloKIcRx4B5JPf6nWC65tiN0HmLNWPbWWJLXlkPI5IF7oQe4qpe4eeDsAEMu",
    Authorization: token ? `Bearer ${token}` : null,
    Accept: "*/*",
    "Content-Type": contentType ? contentType : "application/json",
  };
}

export const MONTHS = [
  { name: "January", id: 1 },
  { name: "February", id: 2 },
  { name: "March", id: 3 },
  { name: "April", id: 4 },
  { name: "May", id: 5 },
  { name: "June", id: 6 },
  { name: "July", id: 7 },
  { name: "August", id: 8 },
  { name: "September", id: 9 },
  { name: "October", id: 10 },
  { name: "November", id: 11 },
  { name: "December", id: 12 },
];
export const YEARS = Array.from({ length: 10 }, (_, i) => {
  return { name: (2015 + i).toString(), id: Number(2015 + i) };
});

//need to have it to add it on context state
export const KM_UNIT_PRICE = 0.3;
