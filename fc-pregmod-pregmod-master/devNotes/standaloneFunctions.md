# Standalone JS Functions

Collection of custom functions without dependencies on FC specific variables/data structures.

## utilJS.js

* `arraySwap(array, a , b)`:  
    Swaps two values in an array.

* `capFirstChar(string)`:  
    Capitalizes the first character of `string`.

* `addA(word)`:
    Adds an `an ` if the first character is a vocal, otherwise `a `.

* `ordinalSuffix(i)`:  
    Takes a number and appends the appropriate suffix.
    Example: `ordinalSuffix(1)` gives `1st`.

* `ordinalSuffixWords(i)`:  
    Takes a number and returns the appropriate ordinal.
    Example: `ordinalSuffix(1)` gives `first`.  
    For number greater than 19 identical to `ordinalSuffix(i)`  
    
* `removeDuplicates(array)`:  
    Takes an array and returns a new array without duplicate entries.

* `jsDef(x)`:  
    Returns whether x is undefined. A JS port of sugarcube's def.

* `between(a, low, high)`:  
    Returns `true` if `a` is between `low` and `high`, otherwise `false`.


