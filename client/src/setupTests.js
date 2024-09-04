// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation((message) => {
      if (message.includes('ReactDOMTestUtils.act')) {
        return;
      }
      console.error(message);
    });
  });
  
  afterAll(() => {
    console.error.mockRestore();
  });
  