/* eslint-disable react/prop-types */
import { Button } from "@mui/material";

function LostItemCard({ lostItem }) {
	console.log("Claim", lostItem);
	return (
		<div>
			<div className="relative bg-white rounded-lg shadow-lg overflow-hidden w-72">
				<img
					src={lostItem.itemImages[0]}
					alt="item"
					className="w-full h-80 object-cover"
				/>
				<div className="p-4 dark:bg-custom-bg-200">
					<h2 className="text-lg font-bold">{lostItem.name}</h2>
					<p className="text-sm">
						<span className="font-semibold">Date: </span>
						<span className="text-center text-sm p-2">
							{new Date(lostItem.date_lost).toLocaleDateString(
								"en-US",
								{
									weekday: "long",
									year: "numeric",
									month: "long",
									day: "numeric",
								}
							)}
						</span>
					</p>
					<Button
						className="w-full"
						variant="contained"
						color="secondary"
						size="small"
						href={`/lost-reports/${lostItem._id}`}
						style={{
							marginTop: "10px",
							borderRadius: "20px",
						}}
					>
						See Reports
					</Button>
				</div>
			</div>
		</div>
	);
}

export default LostItemCard;
