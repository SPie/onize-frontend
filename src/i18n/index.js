const translations = {
  en: {
    email: 'Email',
    password: 'Password',
    login: 'Login',
    forgotPassword: 'Forgot Password',
    register: 'Register',
    passwordReset: 'Password Reset',
    passwordConfirm: 'Confirm Password',
    currentPassword: 'Current Password',
    changePassword: 'Change Password',
    send: 'Send',
    addProject: 'Add Project',
    label: 'Label',
    description: 'Description',
    add: 'Add',
    deleteProject: 'Delete Project',

    settings: 'Settings',
    logout: 'Logout',

    dialog: {
      close: 'Close',
      delete: 'Delete',
      cancel: 'Cancel'
    },

    message: {
      notAllowed: 'This action is not allowed',
      loginSuccess: 'Login was successful',
      loginFailed: 'Login failed',
      logoutSuccess: 'Logout was successful',
      logoutError: 'Logout failed',
      registerSuccess: 'Register was successful',
      registerError: 'Reister failed',
      passwordChangeSuccess: 'Password change was successful',
      passwordChangeError: 'Password change failed',
      startedPasswordResetSuccess: 'The password reset link was successfully sent',
      startedPasswordResetError: 'Sending password reset link failed',
      verifyPasswordResetError: 'Password reset token is invalid',
      finishPasswordResetSuccess: 'Password reset was successful',
      finishPasswordResetError: 'Password reset failed',
      addProjectSuccess: 'Project successfully added',
      addProjectError: 'Add project failed',
      deleteProjectSuccess: 'Project successfully deleted',
      deleteProjectError: 'Delete project failed'
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
      passwordChange: 'Password Change',
      projects: 'Projects',
      addProject: 'Add Project'
    },

    text: {
      deleteProject: 'Do you really want to delete the project?'
    }
  }
}

export default translations
