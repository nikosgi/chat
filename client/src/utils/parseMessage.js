const AVAILABLE_ACTIONS = [
  'nick',
  'think',
  'oops',
  'fadelast',
  'highlight',
  'countdown'
]

const parseMessage = message => {
  const words = message.split(" ")
  const [first, ...rest] = words;
  const [firstLetter, ...restLetters] = first;
  let action = ''
  let value = ''

  if (firstLetter === '/') {
    action = restLetters.join('')
  }

  if (AVAILABLE_ACTIONS.includes(action)) {
    value = rest.join(" ")
  } else {
    action = 'send'
    value = message
  }

  return {action, value}
}

export default parseMessage