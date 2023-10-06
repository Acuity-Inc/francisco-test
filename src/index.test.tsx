import ReactDOM from 'react-dom/client';

jest.mock('react-dom/client', () => ({
  createRoot: jest.fn(() => ({
    render: jest.fn(),
  })),
}));

jest.mock('./App', () => <div>App</div>);

describe('Index', () => {
  it('should render App using ReactDOM.createRoot', () => {
    const rootRenderMock = jest.fn();
    (ReactDOM.createRoot as jest.Mock).mockReturnValueOnce({
      render: rootRenderMock,
    });

    require('./index');

    expect(ReactDOM.createRoot).toHaveBeenCalled();
    expect(rootRenderMock).toHaveBeenCalled();
  });
});
