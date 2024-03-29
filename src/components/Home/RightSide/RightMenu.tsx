import RightSearch from "./RightSearch";
import WhatsHappening from "./WhatsHappening";
import WhoToFollow from "./WhoToFollow";
import CheckoutGithub from "./CheckoutGithub";
import RightFooter from "./RightFooter";
import NewToChirp from "./NewToChirp";
import YouMightLike from "./YouMightLike";
import { User } from "next-auth";

const RightMenu = async ({ user }: { user: User | undefined }) => {
 return (
  <aside className="pl-4 flex flex-col gap-4 sticky top-0">
   {!!user && (
    <>
     <RightSearch />
     <CheckoutGithub />
     <WhatsHappening />
     <WhoToFollow />
    </>
   )}
   {!user && (
    <div className="pt-2 flex flex-col gap-4">
     <NewToChirp />
     <YouMightLike />
    </div>
   )}
   <RightFooter />
  </aside>
 );
};
export default RightMenu;
