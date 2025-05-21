function convertHour(times) {
    const hour = Math.floor(times / 60);
    const minutes = times % 60;
    return `${hour} hours ${minutes} minutes`
};

export default convertHour