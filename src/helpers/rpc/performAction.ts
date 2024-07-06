import { DomActions } from "./domActions";
import {
  WEB_WAND_LABEL_ATTRIBUTE_NAME,
  VISIBLE_TEXT_ATTRIBUTE_NAME,
} from "../../constants";


function getSelector(label: string): string {
  return `[${WEB_WAND_LABEL_ATTRIBUTE_NAME}="${label}"]`;
}

function getFallbackSelector(selectorName: string): string {
  return `[${VISIBLE_TEXT_ATTRIBUTE_NAME}="${selectorName}"]`;
}

export async function clickWithSelector(
  domActions: DomActions,
  selector: string,
): Promise<boolean> {
  console.log("clickWithSelector", selector);
  return await domActions.clickWithSelector({
    selector,
  });
}

export async function clickWithElementId(
  domActions: DomActions,
  elementId: string,
): Promise<boolean> {
  console.log("clickWithElementId", elementId);
  return await domActions.clickWithElementId({
    elementId: parseInt(elementId),
  });
}

export async function clickWithLabel(
  domActions: DomActions,
  label: string,
): Promise<boolean> {
  console.log("clickWithLabel", label);
  let success = false;
  try {
    success = await domActions.clickWithSelector({
      selector: `#${label}`,
    });
  } catch (e) {
    // `#${selectorName}` might not be valid
  }
  if (success) return true;
  success = await domActions.clickWithSelector({
    selector: getSelector(label),
  });
  if (success) return true;
  return await domActions.clickWithSelector({
    selector: getFallbackSelector(label),
  });
}

export async function setValueWithSelector(
  domActions: DomActions,
  selector: string,
  value: string,
): Promise<boolean> {
  console.log("setValueWithSelector", selector);
  return await domActions.setValueWithSelector({
    selector,
    value,
  });
}

export async function setValueWithElementId(
  domActions: DomActions,
  elementId: string,
  value: string,
): Promise<boolean> {
  console.log("setValueWithElementId", elementId);
  return await domActions.setValueWithElementId({
    elementId: parseInt(elementId),
    value,
  });
}

export async function setValueWithLabel(
  domActions: DomActions,
  label: string,
  value: string,
): Promise<boolean> {
  console.log("setValueWithLabel", label);
  let success = false;
  try {
    success = await domActions.setValueWithSelector({
      selector: `#${label}`,
      value,
    });
  } catch (e) {
    // `#${selectorName}` might not be valid
  }
  if (success) return true;
  success = await domActions.setValueWithSelector({
    selector: getSelector(label),
    value,
  });
  if (success) return true;
  return await domActions.setValueWithSelector({
    selector: getFallbackSelector(label),
    value,
  });
}

export async function scroll(domActions: DomActions, value: string) {
  switch (value) {
    case "up":
      await domActions.scrollUp();
      break;
    case "down":
      await domActions.scrollDown();
      break;
    case "top":
      await domActions.scrollToTop();
      break;
    case "bottom":
      await domActions.scrollToBottom();
      break;
    default:
      console.error("Invalid scroll value", value);
  }
}
