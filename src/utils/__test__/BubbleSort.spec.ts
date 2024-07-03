import { describe, expect, it } from 'vitest'
import { BubbleSort } from '../sorts/BubbleSort'

describe('Bubble sort', () => {
  it('should sort', () => {
    const arr = [
      161, 164, 135, 18, 54, 91, 51, 175, 94, 156, 182, 42, 38, 95, 59, 100, 19, 2, 158, 133, 43,
      55, 137, 20, 136, 144, 65, 178, 126, 134, 189, 62, 184, 68, 165, 6, 35, 39, 32, 155, 199, 177,
      21, 197, 108, 31, 154, 118, 25, 27, 26, 150, 73, 122, 102, 138, 183, 37, 168, 89, 61, 119,
      194, 180, 13, 77, 9, 22, 111, 142, 52, 172, 162, 75, 49, 160, 70, 30, 14, 112, 105, 117, 121,
      76, 82, 93, 132, 71, 114, 143, 16, 48, 86, 152, 83, 106, 153, 167, 7, 79, 176, 147, 200, 170,
      186, 191, 12, 47, 107, 44, 34, 145, 113, 74, 46, 8, 188, 56, 17, 195, 67, 157, 58, 64, 53, 3,
      85, 41, 103, 196, 23, 128, 80, 166, 171, 87, 149, 96, 110, 173, 92, 40, 45, 15, 57, 50, 5, 24,
      127, 104, 179, 146, 120, 99, 36, 174, 4, 84, 185, 98, 101, 192, 130, 90, 198, 169, 109, 193,
      10, 63, 139, 123, 28, 163, 11, 116, 151, 66, 148, 159, 187, 33, 115, 125, 69, 78, 81, 88, 140,
      181, 29, 1, 97, 131, 141, 60, 129, 124, 72, 190
    ]

    BubbleSort.sort(arr)

    expect(arr).toEqual([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
      27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49,
      50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72,
      73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95,
      96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114,
      115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133,
      134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152,
      153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171,
      172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190,
      191, 192, 193, 194, 195, 196, 197, 198, 199, 200
    ])
  })
})
