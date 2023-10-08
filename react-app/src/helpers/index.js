export const convertDate = (date) => {
    const dateArr = date.split(' ');
    return `${dateArr[2]} ${dateArr[1]}`
}

export const shortenString = (str) => {
    let res;
    str.length > 200 ? res = `${str.substring(0, 200)}...` : res = str;
    return res;
}

export const shortenBody = (str) => {
    let res;
    str.length > 90 ? res = `${str.substring(0, 90)}...` : res = str;
    return res;
}
