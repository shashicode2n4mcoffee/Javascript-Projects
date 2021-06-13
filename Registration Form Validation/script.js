const form = document.getElementById('form')
const username = document.getElementById('username')
const email = document.getElementById('email')
const password = document.getElementById('password')
const password2 = document.getElementById('password2')

// Get fieldname
const getFieldName = (input) => {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1)
}

// Show input error message
const showError = (input, message) => {
  const formControl = input.parentElement
  formControl.className = 'form-control error'
  const small = formControl.querySelector('small')
  small.innerText = message
}

// Show success outline
const showSuccess = (input) => {
  const formControl = input.parentElement
  formControl.className = 'form-control success'
}

// Check required fields
const checkRequired = (inputArr) => {
  inputArr.forEach(function (input) {
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} is required`)
    } else {
      showSuccess(input)
    }
  })
}

// Check input length
const checkLength = (input) => {
  if (input.value.length < 6) {
    showError(input, `${getFieldName(input)} must be at least 3 characters`)
  } else if (input.value.length > 32) {
    showError(input, `${getFieldName(input)} must be less than 32 characters`)
  } else {
    showSuccess(input)
  }
}

// Check email is valid
const checkEmail = (input) => {
  const verify =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if (verify.test(input.value.trim())) {
    showSuccess(input)
  } else {
    showError(input, 'Email is not valid')
  }
}

// Check passwords match
const checkPasswordsMatch = (input1, input2) => {
  if (input1.value !== input2.value) {
    showError(input2, 'Passwords do not match')
  }
}

// Event listeners
form.addEventListener('submit', (e) => {
  e.preventDefault()

  checkLength(password)

  checkEmail(email)
  checkPasswordsMatch(password, password2)
  checkRequired([username, email, password, password2])
})
