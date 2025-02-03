export const getAuth = jest.fn(() => ({
  currentUser: { uid: "test-user-id", email: "test@example.com" },
  signInWithEmailAndPassword: jest.fn(() =>
    Promise.resolve({ user: { uid: "test-user-id" } })
  ),
  signOut: jest.fn(() => Promise.resolve()),
}));
