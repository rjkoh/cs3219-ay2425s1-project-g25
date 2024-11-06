import React, { useState } from "react";
import { Button, Modal, message } from "antd";
import { StopOutlined } from "@ant-design/icons";
import styles from "./LeaveButton.module.css";
import { useNavigate } from "react-router-dom";
import { historyUseCases } from "domain/usecases/HistoryUseCases";

interface LeaveButtonProps {
    getEditorText: () => string;
    questionId: string;
    roomId: string;
    attemptStartedAt: Date;
    collaboratorId: string;
    onUserConfirmedLeave: (shouldSave: boolean) => void;
}

const LeaveButton: React.FC<LeaveButtonProps> = ({
    getEditorText,
    questionId,
    roomId,
    attemptStartedAt,
    collaboratorId,
    onUserConfirmedLeave,
}) => {
    const navigate = useNavigate();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editorContent, setEditorContent] = useState("");

    const showModal = () => {
        const content = getEditorText();
        setEditorContent(content);
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    
    const handleLeaveWithoutSaving = () => {
        setIsModalVisible(false);
        onUserConfirmedLeave(false);
        navigate('/');
    };

    const handleSaveAndLeave = async () => {
        try {
            await historyUseCases.createOrUpdateUserHistory(
                questionId,
                roomId,
                attemptStartedAt.getTime().toString(),
                Date.now().toString(),
                collaboratorId,
                getEditorText(),
            );
            message.success("Your work has been saved successfully.");
            onUserConfirmedLeave(false);
            navigate('/');
        } catch (error) {
            if (error instanceof Error) {
                console.error("Failed to save before leaving:", error.message);
                message.error(`Failed to save before leaving: ${error.message}`);
            } else {
                console.error("Unknown error occurred during saving");
                message.error("Unknown error occurred during saving");
            }
        } finally {
            setIsModalVisible(false);
        }
    };

    return (
        <>
            <Button
                onClick={showModal}
                type="text"
                icon={<StopOutlined />}
                className={styles.endButton}
            >
                Leave
            </Button>
            <Modal
                title="Confirm Leave"
                open={isModalVisible}
                onCancel={handleCancel}
                footer={[
                    <Button key="cancel" onClick={handleCancel} color='danger'>
                        Cancel
                    </Button>,
                    <Button key="leaveWithoutSaving" onClick={handleLeaveWithoutSaving} color='danger'>
                        Leave without saving
                    </Button>,
                    <Button key="saveAndLeave" type="primary" onClick={handleSaveAndLeave}>
                        Save and Leave
                    </Button>,
                ]}
                destroyOnClose
            >
                <p>Do you want to save your code before leaving?</p>
                <pre className={styles.modalContent}>{editorContent}</pre>
            </Modal>
        </>
    );
};

export default LeaveButton;
