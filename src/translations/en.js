export default {
  common: {
    add: "Add",
    cancel: "Cancel",
    description: "Description",
    delete: "Delete",
    title: "Title",
    save: "Save",
    faq: "FAQ",
    contact: "Contact Us",
    tos: "Terms of Service",
    policy: "Privacy Policy",
  },
  error: {
    notFound: {
      title: "How did you get here?",
      desc: "Sorry we can't seem to find the page you're looking for.",
    },
    other: {
      title: "OOPS! Something went wrong here",
      desc: "Our experts are working to fix the issue.",
    },
    search: "Search website",
    back: "Send me Back",
  },
  auth: {
    login: {
      title: "Welcome",
      desc: "Sign in to your account",
      button: "Login",
      username: "Username",
      password: "Password",
      noaccount: "Don't have an account?",
      create: "Create on here",
    },
    logon: {},
    logup: {},
    forgot: {
      title: "Forgot password?",
    },
  },
  check: {
    title: "Set New Password",
    backtosign: "Back to Sign In",
    newpassword: "New Password",
    button: "Set new password and Sign in",
    error: "The action link is invalid",
    verifylink: "Verifying link...",
    verifyemail: "Verifying email address...",
    emailverified: "Email verified! Redirecting...",
  },
  forgot: {
    title: "Forgot Password?",
    subtitle: "Enter your account email address and we will send you a link to reset your password.",
    email: "Email",
    button: "Request Password Reset",
    backtosign: "Back to Sign In",
  },
  notification: {
    title: "Notification",
    all: "See All",
  },
  menu: {
    search: 'Search (press "ctrl + /" to focus)',
    logout: "Logout",
    profile: "Profile",
  },
  // Vuetify components translations
  $vuetify: {
    badge: "Badge",
    close: "Close",
    dataIterator: {
      noResultsText: "No matching records found",
      loadingText: "Loading items...",
    },
    dataTable: {
      itemsPerPageText: "Rows per page:",
      ariaLabel: {
        sortDescending: "Sorted descending.",
        sortAscending: "Sorted ascending.",
        sortNone: "Not sorted.",
        activateNone: "Activate to remove sorting.",
        activateDescending: "Activate to sort descending.",
        activateAscending: "Activate to sort ascending.",
      },
      sortBy: "Sort by",
    },
    dataFooter: {
      itemsPerPageText: "Items per page:",
      itemsPerPageAll: "All",
      nextPage: "Next page",
      prevPage: "Previous page",
      firstPage: "First page",
      lastPage: "Last page",
      pageText: "{0}-{1} of {2}",
    },
    datePicker: {
      itemsSelected: "{0} selected",
      nextMonthAriaLabel: "Next month",
      nextYearAriaLabel: "Next year",
      prevMonthAriaLabel: "Previous month",
      prevYearAriaLabel: "Previous year",
    },
    noDataText: "No data available",
    carousel: {
      prev: "Previous visual",
      next: "Next visual",
      ariaLabel: {
        delimiter: "Carousel slide {0} of {1}",
      },
    },
    calendar: {
      moreEvents: "{0} more",
    },
    fileInput: {
      counter: "{0} files",
      counterSize: "{0} files ({1} in total)",
    },
    timePicker: {
      am: "AM",
      pm: "PM",
    },
    pagination: {
      ariaLabel: {
        wrapper: "Pagination Navigation",
        next: "Next page",
        previous: "Previous page",
        page: "Goto Page {0}",
        currentPage: "Current Page, Page {0}",
      },
    },
  },
};
