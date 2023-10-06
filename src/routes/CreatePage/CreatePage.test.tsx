import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import CreatePage from './CreatePage';
import axios from 'axios';
import userEvent from '@testing-library/user-event';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

jest.mock('../../components/Header/Header', () => ({
  __esModule: true,
  default: () => <div>Header</div>,
}));

jest.mock('axios');

jest.mock('@okta/okta-react', () => ({
  useOktaAuth: () => {
    return {
      authState: {},
      authService: {},
    };
  },
}));

describe('Create page', () => {
  it('renders Create page', () => {
    const { getByText } = render(<CreatePage />);
    const createPage = getByText('Create Page');
    expect(createPage).toBeInTheDocument();
  });

  it('calls post on submit', async () => {
    render(<CreatePage />);
    const postSpySuccess = jest.spyOn(axios, 'post').mockImplementation(() => {
      return new Promise((resolve) => {
        return resolve({
          status: 200,
          data: {},
        });
      });
    });

    act(() =>
      userEvent.click(
        screen.getByRole('button', {
          name: /submit/i,
        })
      )
    );

    await waitFor(() => {
      expect(postSpySuccess).toHaveBeenCalled();
    });
    expect(mockNavigate).toBeCalledWith('/');
  });

  it('should update form fields on input change', () => {
    const { getByLabelText } = render(<CreatePage />);
    const nameInput = getByLabelText('Name');

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });

    expect(nameInput).toHaveValue('John Doe');
  });
  it('should update the boolean field when the checkbox is clicked', () => {
    const { getByLabelText } = render(<CreatePage />);
    const checkbox = getByLabelText('Boolean Field');
    expect(checkbox).not.toBeChecked();

    userEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    userEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });
});
