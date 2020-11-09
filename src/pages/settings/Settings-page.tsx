import React from 'react';
import { SettingsPageWrapper } from './settings-page-style';
import SettingsBlock from "../../components/settings-block/SettingsBlock";

function SettingsPage() {
    return (
        <SettingsPageWrapper>
            <h3>SETTINGS</h3>

            <div>
                <SettingsBlock>
                    <div>Me</div>
                    <div>John Doe</div>
                </SettingsBlock>
                <SettingsBlock>
                    <div>Notifications</div>
                    <div>All</div>
                </SettingsBlock>
                <SettingsBlock>
                    <div>Privacy</div>
                    <div>Only me</div>
                </SettingsBlock>
                <SettingsBlock>
                    <div>Login/Logout</div>
                    <div />
                </SettingsBlock>
            </div>
        </SettingsPageWrapper>
    );
}

export default SettingsPage;