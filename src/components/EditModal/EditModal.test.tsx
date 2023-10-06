import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EditModal from './EditModal';

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

const mockData = {
  id: '1',
  parentName: 'MommaBear',
  intField: 1,
  doubleField: 2.0,
  dateField: '2005-03-13T06:00:00.000+00:00',
  stringField: 'Mother',
  booleanField: false,
};

describe('Edit Modal', () => {
  it('renders Edit Modal with data populated', () => {
    const { getByText, getByLabelText } = render(
      <EditModal data={mockData} open={true} action={jest.fn} closeModal={jest.fn} />
    );
    const createPage = getByText('Edit');
    expect(createPage).toBeInTheDocument();
    const nameInput = getByLabelText('Name');
    expect(nameInput).toHaveValue(mockData.parentName);
  });

  it('calls action on submit', async () => {
    const mockAction = jest.fn();
    const mockCloseModal = jest.fn();
    render(
      <EditModal data={mockData} open={true} action={mockAction} closeModal={mockCloseModal} />
    );

    userEvent.click(
      screen.getByRole('button', {
        name: /submit/i,
      })
    );
    expect(mockAction).toBeCalled();
    expect(mockCloseModal).toBeCalled();
  });

  it('should update form fields on input change', () => {
    const { getByLabelText } = render(
      <EditModal data={mockData} open={true} action={jest.fn} closeModal={jest.fn} />
    );
    const nameInput = getByLabelText('Name');
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    expect(nameInput).toHaveValue('John Doe');
  });
  it('should update the boolean field when the checkbox is clicked', () => {
    const { getByLabelText } = render(
      <EditModal data={mockData} open={true} action={jest.fn} closeModal={jest.fn} />
    );
    const checkbox = getByLabelText('Boolean Field');
    expect(checkbox).not.toBeChecked();

    userEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    userEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });
});
