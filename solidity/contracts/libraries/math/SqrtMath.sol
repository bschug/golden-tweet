// SPDX-License-Identifier: MIT
pragma solidity 0.8.14;

library SqrtMath {
  function sqrrt(uint256 a) internal pure returns (uint256 c) {
    if (a > 3) {
      c = a;
      uint256 b = a / 2 + 1;
      while (b < c) {
        c = b;
        b = ((a / b) + b) / 2;
      }
    } else if (a != 0) {
      c = 1;
    }
  }
}
