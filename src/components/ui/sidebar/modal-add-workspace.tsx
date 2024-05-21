import { Button } from "@/components/Button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/Dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/Select";
import { Label } from "@/components/Label";
import { Input } from "@/components/Input";
import { roles } from "@/data/data";

export type ModalProps = {
    children: React.ReactNode;
};

export function ModalAddWorkspace({ children }: ModalProps) {
    return (
        <>
            {/* @SEV: Componentize-review, children correct prop if it should be wrapped around Button ? */}
            <Dialog>
                <DialogTrigger asChild>{children}</DialogTrigger>
                <DialogContent className="sm:max-w-2xl">
                    {/* @SEV/MAXIME: check whether form really appropriate */}
                    <form>
                        <DialogHeader>
                            <DialogTitle>Add new workspace</DialogTitle>
                            <DialogDescription className="mt-1 text-sm leading-6">
                                With free plan, you can add up to 10 workspaces.
                            </DialogDescription>
                            <div className="mt-4 grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="workspace-name" className="font-medium">
                                        Workspace name
                                    </Label>
                                    <Input
                                        id="workspace-name"
                                        name="workspace-name"
                                        placeholder="my_workspace"
                                        className="mt-2"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="starter-kit" className="font-medium">
                                        Starter kit
                                    </Label>
                                    <Select defaultValue="empty-workspace">
                                        <SelectTrigger
                                            id="starter-kit"
                                            name="starter-kit"
                                            className="mt-2"
                                        >
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem
                                                value="empty-workspace"
                                            >
                                                None - Empty workspace
                                            </SelectItem>
                                            <SelectItem
                                                value="commerce-analytics"
                                            >
                                                Commerce analytics
                                            </SelectItem>
                                            <SelectItem
                                                value="product-analytics"
                                            >
                                                Product analytics
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="col-span-full">
                                    <Label htmlFor="database-region" className="font-medium">
                                        Database region
                                    </Label>
                                    <Select defaultValue="europe-west-01">
                                        <SelectTrigger
                                            id="database-region"
                                            name="database-region"
                                            className="mt-2"
                                        >
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem
                                                value="europe-west-01"
                                            >
                                                europe-west-01
                                            </SelectItem>
                                            <SelectItem
                                                value="us-east-02"
                                            >
                                                us-east-02
                                            </SelectItem>
                                            <SelectItem
                                                value="us-west-01"
                                            >
                                                us-west-01
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <p className="mt-2 text-xs text-gray-500">
                                        For best performance, choose a region closest to your application.
                                    </p>
                                </div>
                            </div>
                        </DialogHeader>
                        <DialogFooter className="mt-6">
                            <DialogClose asChild>
                                <Button
                                    className="mt-2 w-full sm:mt-0 sm:w-fit"
                                    variant="secondary"
                                >
                                    Go back
                                </Button>
                            </DialogClose>
                            <DialogClose asChild>
                                <Button type="submit" className="w-full sm:w-fit">
                                    Add workspace
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}
