from app.models.construction_contract import ConstructionContract
from app.models.contact import Contact
from app.models.contract_supervision_area import ContractSupervisionArea


supervision_area = ContractSupervisionArea.objects.filter(
    code="building", contract=8
).first()
if supervision_area:
    supervision_area.supervision_contract = ConstructionContract.objects.get(pk=9)
    supervision_area.save()

supervision_area = ContractSupervisionArea.objects.filter(
    code="social", contract=8
).first()
if supervision_area:
    supervision_area.supervision_contract = ConstructionContract.objects.get(pk=10)
    supervision_area.save()

supervision_area = ContractSupervisionArea.objects.filter(
    code="building", contract=9
).first()
if supervision_area:
    supervision_area.supervisor = Contact.objects.get(pk=2)
    supervision_area.save()

supervision_area = ContractSupervisionArea.objects.filter(
    code="social", contract=10
).first()
if supervision_area:
    supervision_area.supervisor = Contact.objects.get(pk=3)
    supervision_area.save()
