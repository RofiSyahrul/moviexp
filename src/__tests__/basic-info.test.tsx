import React from 'react';
import { renderWithTheme, screen } from '@utils/test-utils';
import BasicInfo from '@components/basic-info';

describe('<BasicInfo />', () => {
  test('Should display a "Movie" type and year "2020"', () => {
    renderWithTheme(<BasicInfo type='movie' year='2020' context='detail' />);
    expect(screen.getByText('Movie')).toBeInstanceOf(HTMLElement);
    expect(screen.getByText('2020')).toBeInstanceOf(HTMLElement);
  });
});
