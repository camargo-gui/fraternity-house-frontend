import { noop } from 'lodash';
import { ResidentScreeningTabs } from '../screens/screening/enum/resident-screening-tabs';

interface Response {
  onPrevious: () => void;
  onNext: () => void;
}

export const handleScreeningNavigation = (
  currentTab: ResidentScreeningTabs,
  setTabs: (tab: ResidentScreeningTabs) => void,
): Response => {
  switch (currentTab) {
    case ResidentScreeningTabs.PersonalData:
      return {
        onPrevious: noop,
        onNext: () => {
          setTabs(ResidentScreeningTabs.Responsible);
        },
      };
    case ResidentScreeningTabs.Responsible:
      return {
        onPrevious: () => {
          setTabs(ResidentScreeningTabs.PersonalData);
        },
        onNext: () => {
          setTabs(ResidentScreeningTabs.Illnesses);
        },
      };
    case ResidentScreeningTabs.Illnesses:
      return {
        onPrevious: () => {
          setTabs(ResidentScreeningTabs.Responsible);
        },
        onNext: () => {
          setTabs(ResidentScreeningTabs.SpecialNeeds);
        },
      };
    case ResidentScreeningTabs.SpecialNeeds:
      return {
        onPrevious: () => {
          setTabs(ResidentScreeningTabs.Illnesses);
        },
        onNext: noop,
      };
  }
};
