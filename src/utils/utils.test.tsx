import axios, { AxiosHeaders } from 'axios';
import {
  axiosDeleteWithAuth,
  axiosGetWithAuth,
  axiosPostWithAuth,
  axiosPutWithAuth,
} from './utils';
import { AuthState } from '@okta/okta-auth-js';
import { config } from '../config';
import { waitFor } from '@testing-library/react';

jest.mock('axios');

const mockAuthState: AuthState = {
  accessToken: {
    accessToken: 'your-access-token',
    authorizeUrl: 'https://demo-url.com',
    claims: {
      sub: '',
    },
    expiresAt: 1234567,
    scopes: [],
    tokenType: 'Bearer',
    userinfoUrl: 'https://demo-url.com',
  },
};

describe('axiosGetWithAuth', () => {
  it('should make a GET request with authorization headers', async () => {
    const input = 'your-endpoint';
    const expectedResult = { data: 'your-data' };
    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${mockAuthState.accessToken?.accessToken}`,
      },
    };

    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue({
      ...expectedResult,
      status: 200,
    });

    const result = await axiosGetWithAuth(input, mockAuthState);

    await waitFor(() => expect(result).toEqual(expectedResult.data));
    await waitFor(() =>
      expect(axios.get).toHaveBeenCalledWith(`${config.javaBaseUrl}${input}`, axiosConfig)
    );
  });

  it('should make a GET request with appended authorization headers when axiosConfig has existing headers', async () => {
    const input = 'your-endpoint';
    const expectedResult = { data: 'your-data' };
    const existingHeaders = {
      'Custom-Header': 'custom-value',
    };
    const axiosConfig = {
      headers: new AxiosHeaders(),
    };
    axiosConfig.headers['Custom-Header'] = 'custom-value';
    const expectedHeaders = {
      ...existingHeaders,
      Authorization: `Bearer ${mockAuthState.accessToken?.accessToken}`,
    };

    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue({
      ...expectedResult,
      status: 200,
    });

    const result = await axiosGetWithAuth(input, mockAuthState, axiosConfig);

    expect(result).toEqual(expectedResult.data);
    expect(axios.get).toHaveBeenCalledWith(`${config.javaBaseUrl}${input}`, {
      headers: expectedHeaders,
    });
  });

  it('should handle GET request error', async () => {
    const input = 'your-endpoint';
    const errorResponse = { response: { status: 500 } };

    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue(errorResponse);

    try {
      await axiosGetWithAuth(input, mockAuthState);
    } catch (error) {
      expect(error).toEqual(errorResponse);
    }
  });
});

describe('axiosPostWithAuth', () => {
  it('should make a POST request with authorization and content-type headers', async () => {
    const input = 'your-endpoint';
    const body = { key: 'value' };
    const expectedResult = {
      data: {
        id: '1',
        parentName: 'test name',
        intField: 10,
        doubleField: 2.5,
        dateField: '2023-09-21T05:00:00.000+00:00',
        stringField: 'test string',
        booleanField: true,
      },
    };
    const mockResponse = { ...expectedResult, status: 200 };
    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${mockAuthState.accessToken?.accessToken}`,
        'Content-Type': 'application/json',
      },
    };

    (axios.post as jest.MockedFunction<typeof axios.post>).mockResolvedValue(mockResponse);

    const result = await axiosPostWithAuth(input, mockAuthState, body);
    expect(result).toEqual(expectedResult.data);
    expect(axios.post).toHaveBeenCalledWith(`${config.javaBaseUrl}${input}`, body, axiosConfig);
  });

  it('should make a POST request with appended authorization and content-type headers when axiosConfig has existing headers', async () => {
    const input = 'your-endpoint';
    const body = { key: 'value' };
    const expectedResult = { data: 'your-data' };
    const axiosConfig = {
      headers: new AxiosHeaders(),
    };
    axiosConfig.headers['Custom-Header'] = 'custom-value';

    const expectedHeaders = {
      'Custom-Header': 'custom-value',
      Authorization: `Bearer ${mockAuthState.accessToken?.accessToken}`,
      'Content-Type': 'application/json',
    };

    (axios.post as jest.MockedFunction<typeof axios.post>).mockResolvedValue({
      ...expectedResult,
      status: 200,
    });

    const result = await axiosPostWithAuth(input, mockAuthState, body, axiosConfig);

    expect(result).toEqual(expectedResult.data);
    expect(axios.post).toHaveBeenCalledWith(`${config.javaBaseUrl}${input}`, body, {
      headers: expectedHeaders,
    });
  });

  it('should handle POST request error', async () => {
    const input = 'your-endpoint';
    const body = { key: 'value' };
    const errorResponse = { response: { status: 500 } };

    (axios.post as jest.MockedFunction<typeof axios.post>).mockResolvedValue(errorResponse);

    try {
      await axiosPostWithAuth(input, mockAuthState, body);
    } catch (error) {
      expect(error).toEqual(errorResponse);
    }
  });
});

describe('axiosDeleteWithAuth', () => {
  it('should make a DELETE request with appended authorization and content-type headers when axiosConfig has existing headers', async () => {
    const id = 'a4606465-56e3-4cd7-8a1c-673027215644';
    const input = 'your-endpoint';
    const expectedResult = { data: 'your-data' };
    const axiosConfig = {
      headers: new AxiosHeaders(),
    };
    axiosConfig.headers['Custom-Header'] = 'custom-value';

    const expectedHeaders = {
      'Custom-Header': 'custom-value',
      Authorization: `Bearer ${mockAuthState.accessToken?.accessToken}`,
    };

    (axios.delete as jest.MockedFunction<typeof axios.delete>).mockResolvedValue({
      ...expectedResult,
      status: 200,
    });

    const result = await axiosDeleteWithAuth(id, input, mockAuthState, axiosConfig);

    expect(result).toEqual(expectedResult.data);
    expect(axios.delete).toHaveBeenCalledWith(`${config.javaBaseUrl}${input}/${id}`, {
      headers: expectedHeaders,
    });
  });

  it('should handle DELETE request error', async () => {
    const id = 'a4606465-56e3-4cd7-8a1c-673027215644';
    const input = 'your-endpoint';
    const errorResponse = { response: { status: 500 } };

    (axios.delete as jest.MockedFunction<typeof axios.delete>).mockResolvedValue(errorResponse);

    try {
      await axiosDeleteWithAuth(id, input, mockAuthState);
    } catch (error) {
      expect(error).toEqual(errorResponse);
    }
  });
});

describe('axiosPutWithAuth', () => {
  it('should make a PUT request with authorization and content-type headers', async () => {
    const input = 'your-endpoint';
    const body = { key: 'value' };
    const expectedResult = {
      data: {
        id: '1',
        parentName: 'test name',
        intField: 10,
        doubleField: 2.5,
        dateField: '2023-09-21T05:00:00.000+00:00',
        stringField: 'test string',
        booleanField: true,
      },
    };
    const mockResponse = { ...expectedResult, status: 200 };
    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${mockAuthState.accessToken?.accessToken}`,
        'Content-Type': 'application/json',
      },
    };

    (axios.put as jest.MockedFunction<typeof axios.put>).mockResolvedValue(mockResponse);

    const result = await axiosPutWithAuth(input, mockAuthState, body);
    expect(result).toEqual(expectedResult.data);
    expect(axios.put).toHaveBeenCalledWith(`${config.javaBaseUrl}${input}`, body, axiosConfig);
  });

  it('should make a PUT request with appended authorization and content-type headers when axiosConfig has existing headers', async () => {
    const input = 'your-endpoint';
    const body = { key: 'value' };
    const expectedResult = { data: 'your-data' };
    const axiosConfig = {
      headers: new AxiosHeaders(),
    };
    axiosConfig.headers['Custom-Header'] = 'custom-value';

    const expectedHeaders = {
      'Custom-Header': 'custom-value',
      Authorization: `Bearer ${mockAuthState.accessToken?.accessToken}`,
      'Content-Type': 'application/json',
    };

    (axios.put as jest.MockedFunction<typeof axios.put>).mockResolvedValue({
      ...expectedResult,
      status: 200,
    });

    const result = await axiosPutWithAuth(input, mockAuthState, body, axiosConfig);

    expect(result).toEqual(expectedResult.data);
    expect(axios.put).toHaveBeenCalledWith(`${config.javaBaseUrl}${input}`, body, {
      headers: expectedHeaders,
    });
  });

  it('should handle PUT request error', async () => {
    const input = 'your-endpoint';
    const body = { key: 'value' };
    const errorResponse = { response: { status: 500 } };

    (axios.put as jest.MockedFunction<typeof axios.put>).mockResolvedValue(errorResponse);

    try {
      await axiosPutWithAuth(input, mockAuthState, body);
    } catch (error) {
      expect(error).toEqual(errorResponse);
    }
  });
});
