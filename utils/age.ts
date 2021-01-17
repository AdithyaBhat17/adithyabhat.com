export function calculateAge(currentDate = new Date()): number {
  const birthDate = new Date('1998-01-17')

  let age = currentDate.getFullYear() - birthDate.getFullYear()

  if (
    currentDate.getMonth() < birthDate.getMonth() ||
    (currentDate.getMonth() === birthDate.getMonth() &&
      currentDate.getDate() < birthDate.getDate())
  ) {
    age = age - 1
  }

  return age
}
