import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';

import { Theme } from '@mui/material';
import { makeStyles } from '../../../styles';

import Toolbar from '@mui/material/Toolbar';

import dayjs from 'dayjs';

import ToolbarButton from '../ToolbarButton';

import HourView from './HourView';
import MinutesView from './MinutesView';

/**
 * Creates the global styles for time picker.
 *
 * @param theme - The theme object containing the palette.
 * @returns - The global styles object.
 */
const globalStyles = (theme: Theme) => ({
  container: {
    width: 300,
    height: 420,
  },
  toolbar: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: theme.palette.primary.main,
    height: 100,
  },
});

/**
 * Creates and returns an object containing the styles for a component.
 *
 * @function
 *
 * @param theme - The theme object.
 * @returns The styles object for the component.
 */
const useStyles = makeStyles()((theme) => ({
  ...globalStyles(theme),
  toolbar: {
    ...globalStyles(theme).toolbar,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 50,
  },
  separator: {
    margin: '0 2px 0 4px',
    cursor: 'default',
  },
  ampmSelection: {
    marginLeft: 20,
    marginRight: -20,
  },
  ampmLabel: {
    fontSize: 18,
  },
}));

/**
 * A TimePicker component that allows users to select a time.
 *
 * @param [options] - The options for the TimePicker.
 * @param [options.onChange] - The callback function triggered when the selected time changes.
 * @param [options.date] - The initial date and time to display in the TimePicker.
 *
 * @returns The TimePicker component.
 */
export const TimePicker = ({
  onChange = (change: any) => console.log({change}),
  date: upperDate = dayjs(),
}) => {
  const [date, setDate] = useState(upperDate);
  const { classes } = useStyles();
  const [state, setState] = useState({
    meridiemMode: date.format('a'),
    isHourViewShown: true,
  });
  /**
   * A callback function to handle change in time.
   *
   * @param time - The time value that was changed.
   * @returns
   */
  const handleChange = useCallback((time: dayjs.Dayjs) => {
    if (time.format('a') !== state.meridiemMode) {
      const hours = state.meridiemMode === 'am'
        ? time.hour() - 12
        : time.hour() + 12;
      time = time.clone().hour(hours);
    }
    setDate(time);
    onChange(time);
  }, [state]);
  /**
   * Sets the meridiem mode of the component.
   *
   * @param mode - The new meridiem mode to be set.
   * @returns - A function that updates the state with the new meridiem mode.
   */
  const setMeridiemMode = (mode: any) => () => setState((p) => ({...p, meridiemMode: mode }));
  useEffect(() => handleChange(date), [state.meridiemMode]);
  /**
   * Sets the 'isHourViewShown' state to false.
   * This function is used to hide the hour view in the minutes view.
   *
   * @function openMinutesView
   * @returns
   */
  const openMinutesView = () => setState((p) => ({...p, isHourViewShown: false}));
  /**
   * Sets the `isHourViewShown` state to `true` when called.
   *
   * @function openHourView
   * @returns
   */
  const openHourView = () => setState((p) => ({...p, isHourViewShown: true}));
  return (
    <div className={classes.container}>
      <Toolbar className={classes.toolbar}>
        <ToolbarButton
          type="display3"
          onClick={openHourView}
          selected={state.isHourViewShown}
          label={state.meridiemMode === 'am' ? date.format('hh') : date.format('HH')}
        />
        <ToolbarButton
          type="display3"
          label=":"
          selected={false}
          className={classes.separator}
        />
        <ToolbarButton
          type="display3"
          onClick={openMinutesView}
          selected={!state.isHourViewShown}
          label={date.format('mm')}
        />
        <div className={classes.ampmSelection}>
          <ToolbarButton
            className={classes.ampmLabel}
            selected={state.meridiemMode === 'am'}
            type="subheading"
            label="AM"
            onClick={setMeridiemMode('am')}
          />
          <ToolbarButton
            className={classes.ampmLabel}
            selected={state.meridiemMode === 'pm'}
            type="subheading"
            label="PM"
            onClick={setMeridiemMode('pm')}
          />
        </div>
      </Toolbar>
      {
        state.isHourViewShown
          ?
            <HourView
              date={date}
              onChange={handleChange}
            />
          :
            <MinutesView
              date={date}
              onChange={handleChange}
            />
      }
    </div>
  );
};

export default TimePicker;
