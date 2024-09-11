export const formatDate = (date) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Intl.DateTimeFormat("en-IN", options).format(date);
};
