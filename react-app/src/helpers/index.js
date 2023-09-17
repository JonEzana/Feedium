export const convertDate = (date) => {
    const dateArr = date.split(' ');
    return `${dateArr[2]} ${dateArr[1]}`
}
