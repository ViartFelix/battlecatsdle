/**
 * Config file for schedulers: various configs, etc.
 */
export default {
  daily_unit_chose: {
    /**
     * How much last units from the dailies to ignore for the next daily.
     * 0 = units can be duplicated from another day to the other
     * positive-int = how much entries to ignore.
     */
    ignore_last_x_units: 7,
  },
} as const
