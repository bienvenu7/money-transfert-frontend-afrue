/**
 * Utility functions to test hydration fixes
 * These can be used in development to verify that hydration issues are resolved
 */

export function logHydrationStatus() {
  if (typeof window !== "undefined") {
    console.log("✅ Client-side rendering active");
    console.log("✅ Window object available:", !!window);
    console.log("✅ Document available:", !!document);
    console.log("✅ Cookies available:", !!document.cookie);
  } else {
    console.log("🔄 Server-side rendering active");
  }
}

export function testCookieAccess() {
  if (typeof window === "undefined") {
    console.log("🔄 Skipping cookie test on server");
    return null;
  }

  try {
    const testCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("app_client="))
      ?.split("=")[1];

    if (testCookie) {
      console.log("✅ Cookie access successful");
      return JSON.parse(testCookie);
    } else {
      console.log("⚠️ No app_client cookie found");
      return null;
    }
  } catch (error) {
    console.error("❌ Cookie access failed:", error);
    return null;
  }
}

export function testLocalStorageAccess() {
  if (typeof window === "undefined") {
    console.log("🔄 Skipping localStorage test on server");
    return null;
  }

  try {
    const testValue = localStorage.getItem("test");
    console.log("✅ localStorage access successful");
    return testValue;
  } catch (error) {
    console.error("❌ localStorage access failed:", error);
    return null;
  }
}

export function testWindowDimensions() {
  if (typeof window === "undefined") {
    console.log("🔄 Skipping window dimensions test on server");
    return { width: 0, height: 0 };
  }

  try {
    const dimensions = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    console.log("✅ Window dimensions access successful:", dimensions);
    return dimensions;
  } catch (error) {
    console.error("❌ Window dimensions access failed:", error);
    return { width: 0, height: 0 };
  }
}

// Development helper to run all tests
export function runHydrationTests() {
  console.log("🧪 Running hydration tests...");
  logHydrationStatus();
  testCookieAccess();
  testLocalStorageAccess();
  testWindowDimensions();
  console.log("🧪 Hydration tests completed");
}
