import {
  experts as expertData,
  howItWorksSteps,
  platformStats,
  serviceCategories,
} from "@/data/content";

function clone(data) {
  if (typeof data === "undefined") {
    return undefined;
  }

  return JSON.parse(JSON.stringify(data));
}

export function fetchServiceCategories() {
  return Promise.resolve({ data: clone(serviceCategories) });
}

export function fetchExperts(params = {}) {
  const { city, specialty, verified } = params;

  const filteredExperts = expertData.filter((expert) => {
    if (city && expert.location !== city) {
      return false;
    }

    if (specialty && !expert.specialty.includes(specialty)) {
      return false;
    }

    if (typeof verified === "boolean" && expert.verified !== verified) {
      return false;
    }

    return true;
  });

  return Promise.resolve({
    data: clone(filteredExperts),
    meta: { total: filteredExperts.length },
  });
}

export function fetchHowItWorksSteps() {
  return Promise.resolve({ data: clone(howItWorksSteps) });
}

export function fetchPlatformStats() {
  return Promise.resolve({ data: clone(platformStats) });
}

export function createBooking(payload) {
  const booking = {
    ...payload,
    id: `booking-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };

  return Promise.resolve({
    message: "رزرو با موفقیت ثبت شد",
    data: clone(booking),
  });
}
