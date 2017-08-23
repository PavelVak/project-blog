export const validationMessages: { [key: string]: { [key: string]: string } } = {
  email: {
    required: 'Email is required.',
    pattern: 'Please enter a valid email address',
  },
  password: {
    required: 'Password is required',
    minlength: 'Password must be at least 6 characters.',
    maxlength: 'Password cannot exceed 10 characters.'
  },
  displayName: {
    required: 'DispalayName is required',
    minlength: 'DisplayName must be at least three characters.',
    maxlength: 'DisplayName cannot exceed 10 characters.'
  },
  firstName: {
    required: 'First Name is required',
    minlength: 'First Name must be at least three characters.',
    maxlength: 'First Name cannot exceed 10 characters.'
  },
  lastName: {
    required: 'Last Name is required',
    minlength: 'Last Name must be at least three characters.',
    maxlength: 'Last Name cannot exceed 10 characters.'
  },
  blogHead: {
    required: 'Blog Title is required',
    minlength: 'Blog Title must be at least three characters.',
    maxlength: 'Blog Title cannot exceed 100 characters.'
  },
  blogContent: {
    required: 'Blog Content is required',
    minlength: 'Blog Content must be at least three characters.',
  }
};
