const AVAILABLE_ACTIONS = [
  'nick',
  'think',
  'oops',
  'fadelast',
  'highlight'
]

export default message => {
  const words = message.split(" ")
  const [first, ...rest] = words;
  const [firstLetter, ...restLetters] = first;
  let action = ''
  let value = ''

  if (firstLetter === '/') {
    action = restLetters.join('')
  }

  if (AVAILABLE_ACTIONS.includes(action)) {
    value = rest[0]
  } else {
    action = 'send'
    value = message
  }

  return {action, value}
}