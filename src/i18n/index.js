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
    owner: 'Owner',
    members: 'Members',
    pendingInvites: 'Pending Invites',
    inviteUser: 'Invite User',
    projectMetaDataElements: 'Project Metadata Elements',
    required: 'Required',
    inList: 'In List',
    name: 'Name',

    settings: 'Settings',
    logout: 'Logout',

    dialog: {
      close: 'Close',
      delete: 'Delete',
      cancel: 'Cancel',
      invite: 'Invite',
      add: 'Add'
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
      deleteProjectError: 'Delete project failed',
      projectInviteSuccess: 'User successfully invited to project',
      projectInviteError: 'Invite user to project failed',
      addMetaDataElementSuccess: 'Meta data element successfully added',
      addMetaDataElementError: 'Adding meta data element failed'
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
      },
      alreadyMember: 'The user is already member ot this project'
    },

    pages: {
      securitySettings: 'Security Settings',
      passwordChange: 'Password Change',
      projects: 'Projects',
      project: 'Project',
      projectMembers: 'Members',
      addProject: 'Add Project',
      projectConfiguration: 'Project Configuration',
      addMetaDataElement: 'Add Meta Data Element'
    },

    text: {
      deleteProject: 'Do you really want to delete the project?'
    }
  }
}

export default translations
