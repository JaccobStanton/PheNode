function HttpsRedirect({ disabled, children }) {
  const isLocalHost = (hostname) => {
    return (
      hostname === "localhost" ||
      hostname === "[::1]" ||
      hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
    );
  };

  if (
    !disabled &&
    typeof window !== "undefined" &&
    window.location &&
    window.location.protocol === "http:" &&
    !isLocalHost(window.location.hostname)
  ) {
    window.location.href = window.location.href.replace(/^http(?!s)/, "https");
    return null;
  } else {
    return children;
  }
}

export default HttpsRedirect;
