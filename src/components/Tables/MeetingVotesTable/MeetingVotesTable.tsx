import React from "react";
import { MeetingVotesTableRow } from "../MeetingVotesTableRow";
import { EmptyRow } from "../EmptyRow";
import { ReactiveTable } from "../ReactiveTable";
import { MeetingVote } from "../../Shared/Types/MeetingVote";
import "@mozilla-protocol/core/protocol/css/protocol.css";

type MeetingVotesTableProps = {
  /** an array of Votes */
  votesPage: object[];
};

function renderEmpty(index: number) {
  return <EmptyRow key={`empty-table-row-${index}`} index={index} />;
}

const MeetingVotesTable = ({ votesPage }: MeetingVotesTableProps) => {
  const COLUMN_NAMES = ["Legislation", "Council Decision", "Votes"];
  const COLUMN_DISTRIBUTION = ["35%", "25%", "40%"];

  function renderRow(meetingVotes: MeetingVote, index: number) {
    if (!meetingVotes.matter || !meetingVotes.votes) return renderEmpty(index);
    const legislationName = meetingVotes.matter.name;
    const legislationDescription = meetingVotes.matter.description;
    const councilDecision = meetingVotes.council_decision;
    const legislationLink = `/matters/${meetingVotes.matter.id}`;

    return (
      <MeetingVotesTableRow
        key={`meeting-voting-table-row-${index}`}
        index={index}
        legislationName={legislationName}
        legislationDescription={legislationDescription}
        councilDecision={councilDecision}
        legislationLink={legislationLink}
        votes={meetingVotes.votes}
        columnDistribution={COLUMN_DISTRIBUTION}
        columnNames={COLUMN_NAMES}
      />
    );
  }

  return (
    <ReactiveTable
      data={votesPage}
      columnDistribution={COLUMN_DISTRIBUTION}
      columnNames={COLUMN_NAMES}
      caption={<p>Click each row to see how council members voted</p>}
      renderRow={renderRow}
    />
  );
};

export default MeetingVotesTable;
