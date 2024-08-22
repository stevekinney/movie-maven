import { describe, expect, it } from 'vitest';
import { parsePath } from './parse-path';

describe('parseUrl', () => {
  it('should get params from a URL', () => {
    const params = parsePath('/movies/:id', '/movies/1');
    expect(params).toEqual({ id: '1' });
  });

  it('should get params from a URL with multiple params', () => {
    const params = parsePath('/movies/:id/:slug', '/movies/1/hello-world');
    expect(params).toEqual({ id: '1', slug: 'hello-world' });
  });

  it('should return null if the URL does not match the pattern', () => {
    const params = parsePath('/movies/:id', '/movies');
    expect(params).toEqual({ id: undefined });
  });

  it('should return matching results if the URL does not match the pattern', () => {
    const params = parsePath('/movies/:id', '/movies/1/hello-world');
    expect(params).toEqual({ id: '1' });
  });
});
