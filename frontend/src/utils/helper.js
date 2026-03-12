export const getInitials = (name) => {
  if (!name || typeof name !== "string") return "";

  const words = name.trim().split(/\s+/); // handles multiple spaces
  const initials = words.slice(0, 2).map(word => word[0]).join("");

  return initials.toUpperCase();
};