/**
 * Copyright 2026 Sendbird, Inc.
 * SPDX-License-Identifier: Apache-2.0
 */

import process from "node:process";

import {
  cleanupManagedGlobalIntegrations,
  getManagedPluginSignals,
} from "../../scripts/lib/managed-global-integration.mjs";

export function cleanupAfterOfficialUninstall(pluginRoot) {
  const signals = getManagedPluginSignals();

  if (signals.configState === "active") {
    return false;
  }

  if (signals.configState !== "inactive" || signals.cachePresent) {
    return false;
  }

  process.stderr.write(
    `[cc] removing managed hooks after explicit uninstall signals (${signals.reason}, cache missing)\n`
  );
  cleanupManagedGlobalIntegrations(pluginRoot);
  return true;
}
