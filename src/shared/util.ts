/**
 * hàm format date, nhận vào là 1 date instance
 * và trả về là string với 'YY/MM/DDDD'
 * @param date ngày nhập vào
 */
export function formatDate(date: Date) {
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()

  return `${day}/${month}/${year}`
}
