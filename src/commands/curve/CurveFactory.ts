import * as THREE from "three";
import c3d from '../../../build/Release/c3d.node';
import { TemporaryObject } from "../../editor/GeometryDatabase";
import { GeometryFactory, ValidationError } from '../Factory';

const curveMinimumPoints = new Map<c3d.SpaceType, number>();
curveMinimumPoints.set(c3d.SpaceType.Polyline3D, 2);
curveMinimumPoints.set(c3d.SpaceType.Hermit3D, 2);
curveMinimumPoints.set(c3d.SpaceType.Bezier3D, 2);
curveMinimumPoints.set(c3d.SpaceType.Nurbs3D, 4);
curveMinimumPoints.set(c3d.SpaceType.CubicSpline3D, 3);

export default class CurveFactory extends GeometryFactory {
    readonly points = new Array<THREE.Vector3>();
    type = c3d.SpaceType.Hermit3D;
    closed = false;

    nextPoint?: THREE.Vector3;

    get startPoint() { return this.points[0] }

    async computeGeometry() {
        const { points, nextPoint, type } = this;

        if (!this.hasEnoughPoints) throw new ValidationError(`${points.length + (nextPoint === undefined ? 0 : 1)} points is too few points for ${c3d.SpaceType[type]}`);

        const cartPoints = points.map(p => new c3d.CartPoint3D(p.x, p.y, p.z));
        if (nextPoint !== undefined)
            cartPoints.push(new c3d.CartPoint3D(nextPoint.x, nextPoint.y, nextPoint.z));

            const curve = c3d.ActionCurve3D.SplineCurve(cartPoints, this.closed, type);
        return new c3d.SpaceInstance(curve);
    }

    get hasEnoughPoints() {
        const { points, nextPoint, type } = this;
        let length = points.length;
        if (nextPoint !== undefined) length++;

        if (length === 0) return false;
        if (length === 1) return false;
        if (length < curveMinimumPoints.get(type)!) return false;
        return true;
    }

    wouldBeClosed(p: THREE.Vector3) {
        return this.points.length >= 2 && p.distanceToSquared(this.startPoint) < 10e-6;
    }
}