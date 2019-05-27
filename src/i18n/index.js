const translations = {
  en: {
    email: 'Email',
    password: 'Password',
    login: 'Login',
    forgotPassword: 'Forgot Password',
    register: 'Register',
    passwordConfirm: 'Confirm Password',
    currentPassword: 'Current Password',
    changePassword: 'Change Password',

    settings: 'Settings',
    logout: 'Logout',

    dialog: {
      close: 'Close'
    },

    message: {
      loginSuccess: 'Login was successful',
      loginFailed: 'Login failed',
      logoutSuccess: 'Logout was successful',
      logoutError: 'Logout failed',
      registerSuccess: 'Register was successful',
      registerError: 'Reister failed',
      passwordChangeSuccess: 'Password change was successful',
      passwordChangeError: 'Password change failed'
    },

    invalidCredentials: 'Invalid credentials',
    validation: {
      required: 'This field is reqired.',
      unique: 'This field has to be unique.',
      same: 'The two fields must match.',
      email: 'This field has to be an email address.',
      min: {
        string: 'The password must have minimum 8 characters.'
      },
      password: {
        current: 'Current password doesn\'t match'
      }
    },

    pages: {
      securitySettings: 'Security Settings',
      passwordChange: 'Password Change'
    }
  }
}

export default translations
