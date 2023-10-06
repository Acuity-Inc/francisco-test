import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import HomePage from './HomePage';
import axios, { AxiosResponse } from 'axios';
import userEvent from '@testing-library/user-event';
import { axiosDeleteWithAuth, axiosGetWithAuth, axiosPutWithAuth } from '../../utils/utils';

const mockEditFormData = {
  booleanField: true,
  dateField: '2023-09-20',
  doubleField: 1.1,
  intField: 1,
  parentName: 'John',
  stringField: 'testString',
};

jest.mock('../../components/Header/Header', () => ({
  __esModule: true,
  default: () => <div>Header</div>,
}));

jest.mock('@okta/okta-react', () => ({
  useOktaAuth: () => {
    return {
      authState: {},
      authService: {},
    };
  },
}));
jest.mock('axios');

jest.mock('../../components/EditModal/EditModal', () => ({
  __esModule: true,
  default: (props: any) => {
    return (
      <div
        data-testid='edit-modal'
        onClick={() => {
          props.action(mockEditFormData);
          props.closeModal();
        }}></div>
    );
  },
}));

jest.mock('../../utils/utils', () => ({
  ...jest.requireActual('../../utils/utils'),
  axiosGetWithAuth: jest.fn(),
  axiosDeleteWithAuth: jest.fn(),
  axiosPutWithAuth: jest.fn(),
}));

describe('Home page', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it('renders Home page', () => {
    const mockAxiosRes = {
      status: 200,
      data: [],
    } as AxiosResponse;
    jest.spyOn(axios, 'get').mockResolvedValueOnce(mockAxiosRes);
    const { getByText } = render(<HomePage />);
    const homePage = getByText('Home Page');
    expect(homePage).toBeInTheDocument();
  });

  it('mocks axios get endpoint', async () => {
    const mockGetData = [
      {
        id: '02be747d-1bcf-45b4-a6f1-e4283d7406d8',
        booleanField: true,
        dateField: null,
        doubleField: null,
        intField: 1,
        parentName: 'Ted',
        stringField: 'testString',
      },
    ];
    (axiosGetWithAuth as jest.Mock).mockResolvedValue(mockGetData);
    render(<HomePage />);

    expect(await screen.findByText('Ted')).toBeInTheDocument();
  });

  it('mocks axios delete endpoint', async () => {
    const mockGetData = [
      {
        id: '02be747d-1bcf-45b4-a6f1-e4283d7406d8',
        booleanField: true,
        dateField: null,
        doubleField: null,
        intField: 1,
        parentName: 'Ted',
        stringField: 'testString',
      },
    ];
    const mockAxiosDeleteRes = 'success';

    (axiosGetWithAuth as jest.Mock).mockResolvedValue(mockGetData);
    (axiosDeleteWithAuth as jest.Mock).mockResolvedValue(mockAxiosDeleteRes);
    render(<HomePage />);
    expect(await screen.findByText('Ted')).toBeInTheDocument();
    const deleteBtn = screen.getByRole('button', {
      name: /delete/i,
    });
    userEvent.click(deleteBtn);
    await waitFor(() => {
      expect(screen.queryByRole('rowheader', { name: /ted/i })).toBeNull();
    });
  });

  it('should open edit modal on Edit click', async () => {
    const mockGetData = {
      status: 200,
      data: [
        {
          booleanField: true,
          dateField: null,
          doubleField: null,
          intField: null,
          parentName: 'Ted',
          stringField: null,
          id: 'a4606465-56e3-4cd7-8a1c-673027215644',
        },
      ],
    } as AxiosResponse;
    (axiosGetWithAuth as jest.Mock).mockResolvedValue(mockGetData.data);
    const { findByRole, findByTestId } = render(<HomePage />);
    const editBtn = await findByRole('button', { name: /edit/i });
    userEvent.click(editBtn);
    expect(await findByTestId('edit-modal')).toBeInTheDocument();
  });
  it('should make an axios Put with form on handleSubmitEdit', async () => {
    const mockGetData = {
      status: 200,
      data: [
        {
          booleanField: true,
          dateField: null,
          doubleField: null,
          intField: null,
          parentName: 'Ted',
          stringField: null,
          id: 'a4606465-56e3-4cd7-8a1c-673027215644',
        },
      ],
    } as AxiosResponse;
    const mockAxiosPutRes = {
      ...mockEditFormData,
      id: 'a4606465-56e3-4cd7-8a1c-673027215644',
    };
    (axiosGetWithAuth as jest.Mock).mockResolvedValue(mockGetData.data);
    (axiosPutWithAuth as jest.Mock).mockResolvedValue(mockAxiosPutRes);
    const { findByRole, findByTestId } = render(<HomePage />);
    const editBtn = await findByRole('button', { name: /edit/i });
    userEvent.click(editBtn);
    const editModal = await findByTestId('edit-modal');

    userEvent.click(editModal);

    await waitFor(() =>
      expect(axiosPutWithAuth).toHaveBeenCalledWith('parents', {}, mockAxiosPutRes)
    );
    expect(editModal).not.toBeInTheDocument();
  });
});
