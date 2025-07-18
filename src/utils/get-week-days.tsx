export function getWeekDays() {
    const formatter = new Intl.DateTimeFormat("pt-BR", {
        weekday: "long",
    });

    return Array.from(Array(7).keys())
    .map(day => {
        const weekDay = formatter.format(new Date(Date.UTC(2021, 5, day)));
        return weekDay.substring(0, 1).toUpperCase() + weekDay.substring(1);
    });
}