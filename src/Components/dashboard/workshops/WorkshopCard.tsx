import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import className from 'classnames';
import PropTypes from 'prop-types';
import format from 'date-fns/format';
import { fr } from 'date-fns/locale';

import { ReactComponent as EditIcon } from '~/assets/icons/edit_24px.svg';
import { ReactComponent as MoreVertIcon } from '~/assets/icons/more_vert_24px.svg';
import { ReactComponent as DeleteForeverIcon } from '~/assets/icons/delete_forever_16px.svg';
import { ReactComponent as CancelIcon } from '~/assets/icons/cancel_24px.svg';
import { ReactComponent as BackupRestoreIcon } from '~/assets/icons/settings_backup_restore_24px.svg';
import { ReactComponent as VideoCamIcon } from '~/assets/icons/videocam_24px.svg';

import ActionMenuPopover from '~/Components/shared/actionMenuPopover/ActionMenuPopover';
import Action from '~/Components/shared/actionMenuPopover/Action';
import ConfirmDialog from '~/Components/shared/modals/ConfirmDialog';
import * as statusConst from '~/state/workshops/constants/status';
import * as action from '~/state/workshops/actions';

import './WorkshopCard.scss';

const propTypes = {
    workshop: PropTypes.shape({
        id: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        thumbnail: PropTypes.string,
        title: PropTypes.string.isRequired,
        startingdate: PropTypes.object.isRequired,
        // duration: PropTypes.object,
        topics: PropTypes.arrayOf(PropTypes.string).isRequired,
        description: PropTypes.string.isRequired,
    }),
};

const WorkshopCard: FC<PropTypes.InferProps<typeof propTypes>> = ({
    workshop: { id, status, thumbnail, title, startingdate, topics, description },
}) => {
    const dispatch = useDispatch();
    const history = useHistory();

    return (
        <Card className="card">
            <div className="image-container">
                {!!thumbnail && (
                    // && <Card.Img variant="top" alt="Workshop's thumbnail" src={thumbnail} />}
                    <Card.Img variant="top" alt="Workshop's thumbnail" data-src={thumbnail} className="lazyload" />
                )}
                <Card.ImgOverlay>
                    <div
                        className={className('status', {
                            incoming: status === statusConst.INCOMING,
                            live: status === statusConst.LIVE,
                            published: status === statusConst.PUBLISHED,
                            unpublished: status === statusConst.UNPUBLISHED,
                            archived: status === statusConst.ARCHIVED,
                        })}
                    >
                        {status}
                    </div>
                    {status !== statusConst.LIVE && (
                        <div className="actionMenuContainer">
                            <ActionMenuPopover icon={<MoreVertIcon title="Actions" />} placement="bottom-end">
                                {status === statusConst.INCOMING && (
                                    <>
                                        <Action
                                            icon={<CancelIcon />}
                                            label="Annuler"
                                            modalConfirmation={
                                                <ConfirmDialog
                                                    show
                                                    title="Annuler cet atelier"
                                                    body="Cette action n’est pas réversible."
                                                    cancelButton="Annuler"
                                                    okButton="Annuler l'atelier"
                                                    handleClose={() => {}}
                                                    handleConfirm={() => dispatch(action.cancelWorkshop(id))}
                                                />
                                            }
                                        />
                                        <Action
                                            icon={<VideoCamIcon />}
                                            label="GO LIVE"
                                            action={() => history.push(`/dashboard/goLive/${id}`)}
                                        />
                                    </>
                                )}
                                {status === statusConst.PUBLISHED && (
                                    <Action
                                        icon={<BackupRestoreIcon />}
                                        label="Archiver"
                                        action={() => dispatch(action.archiveWorkshop(id))}
                                    />
                                )}
                                {status === statusConst.ARCHIVED && (
                                    <Action
                                        icon={<BackupRestoreIcon />}
                                        label="Restaurer"
                                        action={() => dispatch(action.restoreWorkshop(id))}
                                    />
                                )}
                                {[statusConst.PUBLISHED, statusConst.UNPUBLISHED, statusConst.ARCHIVED].includes(
                                    status,
                                ) && (
                                    <Action
                                        icon={<DeleteForeverIcon />}
                                        label="Supprimer"
                                        modalConfirmation={
                                            <ConfirmDialog
                                                show
                                                title="Supprimer cet atelier et toutes les videos associées"
                                                body="Cette action n’est pas réversible."
                                                cancelButton="Annuler"
                                                okButton="Supprimer"
                                                handleClose={() => {}}
                                                handleConfirm={() => dispatch(action.deleteWorkshop(id))}
                                            />
                                        }
                                    />
                                )}
                            </ActionMenuPopover>
                        </div>
                    )}
                    <EditIcon
                        title="Modifier"
                        className="editIcon"
                        onClick={() => {
                            history.push(`/dashboard/editWorkshop/${id}`);
                        }}
                    />
                    {status === statusConst.INCOMING ? (
                        <div className="startingdate">{format(startingdate, 'd MMMM yyyy HH:mm', { locale: fr })}</div>
                    ) : (
                        <div className="duration">14:00:45</div> // TODO duration
                    )}
                </Card.ImgOverlay>
            </div>

            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text className="topics">{topics.join(', ')}</Card.Text>
                <Card.Text className="description">{description}</Card.Text>
            </Card.Body>
        </Card>
    );
};

WorkshopCard.propTypes = propTypes;

export default WorkshopCard;
