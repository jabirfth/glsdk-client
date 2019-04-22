import { BytesPipe } from './bytes.pipe';

describe('BytesPipe', () => {

  let bytesPipe: BytesPipe;

  beforeEach(() => {
    bytesPipe = new BytesPipe();
  });

  describe('transform()', () => {

    it('should use Byte unit when < 1024', () => {
      // Given
      const inputValue = 100;
      const expectedResult = '100.00 B';

      // When
      const result = bytesPipe.transform(inputValue);

      // Then
      expect(result).toBe(expectedResult);
    });

    it('should use KiloByte unit when >= 1024 and < 1024 * 1024', () => {
      // Given
      const inputValue = 2048;
      const expectedResult = '2.00 KB';

      // When
      const result = bytesPipe.transform(inputValue);

      // Then
      expect(result).toBe(expectedResult);
    });

    it('should use MegaByte unit when >= 1024 * 1024 and < 1024 * 1024 * 1024', () => {
      // Given
      const inputValue = 1024 * 1024;
      const expectedResult = '1.00 MB';

      // When
      const result = bytesPipe.transform(inputValue);

      // Then
      expect(result).toBe(expectedResult);
    });

    it('should use GigaByte unit when >= 1024^3 and < 1024^4', () => {
      // Given
      const inputValue = 1024 * 1024 * 1024;
      const expectedResult = '1.00 GB';

      // When
      const result = bytesPipe.transform(inputValue);

      // Then
      expect(result).toBe(expectedResult);
    });

    it('should use TeraByte unit when >= 1024^4', () => {
      // Given
      const inputValue = 1024 * 1024 * 1024 * 1024;
      const expectedResult = '1.00 TB';

      // When
      const result = bytesPipe.transform(inputValue);

      // Then
      expect(result).toBe(expectedResult);
    });

    it('should limit decimals to 2 by default', () => {
      // Given
      const inputValue = 10.252516;
      const expectedResult = '10.25 B';

      // When
      const result = bytesPipe.transform(inputValue);

      // Then
      expect(result).toBe(expectedResult);
    });

    it('should limit decimals to the number passed in parameters', () => {
      // Given
      const inputValue = 10.252516;
      const decimals = 5;
      const expectedResult = '10.25252 B';

      // When
      const result = bytesPipe.transform(inputValue, decimals);

      // Then
      expect(result).toBe(expectedResult);
    });

    it('should use parameter as base unit', () => {
      // Given
      const inputValue = 1024;
      const baseUnit = 'KB';
      const decimals = 0;
      const expectedResult = '1 MB';

      // When
      const result = bytesPipe.transform(inputValue, decimals, baseUnit);

      // Then
      expect(result).toBe(expectedResult);
    });

  });

});
