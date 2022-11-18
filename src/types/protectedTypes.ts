export type TProtectedRuleChecker = (check: boolean) => void;

export interface IProtectedRuleProps {
  setCheck: TProtectedRuleChecker;
}
